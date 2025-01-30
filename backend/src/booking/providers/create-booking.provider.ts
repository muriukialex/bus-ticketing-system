import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BUS_SEAT_DOES_NOT_EXIST,
  BUS_SEATS_ARE_EMPTY_ERROR,
  UNABLE_TO_PROCESS_REQUEST,
} from 'src/common/error-messages/error-messages';
import { TravellingBusService } from 'src/travelling-bus/providers/travelling-bus.service';
import { TravellingBus } from 'src/travelling-bus/travelling-bus.entity';
import { UserService } from 'src/user/providers/user.service';
import { Repository } from 'typeorm';
import { Booking } from '../booking.entity';
import { CreateBookingDto } from '../dtos/create-booking.dto';

@Injectable()
export class CreateBookingProvider {
  constructor(
    /**
     * Inject bookingRepository
     */
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,

    /**
     * Inject travellingBusService
     */
    private readonly travellingBusService: TravellingBusService,

    /**
     * Inject userService
     */
    private readonly userService: UserService,
  ) {}
  public async createBooking(createBookingDto: CreateBookingDto) {
    const travellingBus: TravellingBus =
      await this.travellingBusService.getTravellingBusById(
        createBookingDto.travellingBusId,
      );

    const user = await this.userService.findUserById(createBookingDto.userId);

    if (travellingBus.busSeats < 1) {
      throw new BadRequestException(BUS_SEATS_ARE_EMPTY_ERROR.message, {
        description: BUS_SEATS_ARE_EMPTY_ERROR.description,
      });
    }

    for (const seatToBook of createBookingDto.seatNumbers) {
      if (!travellingBus.seats.includes(seatToBook)) {
        throw new BadRequestException(BUS_SEAT_DOES_NOT_EXIST.message, {
          description: BUS_SEAT_DOES_NOT_EXIST.description,
        });
      }

      travellingBus.seats = travellingBus.seats.filter(
        (seat) => seatToBook !== seat,
      );
    }

    const busSeats =
      travellingBus.busSeats - createBookingDto.seatNumbers.length;
    travellingBus.busSeats = busSeats;

    await this.travellingBusService.updateTravellingBus(travellingBus);

    let newBooking = this.bookingRepository.create({
      ...createBookingDto,
      travellingBus: travellingBus,
      user: user,
    });
    try {
      newBooking = await this.bookingRepository.save(newBooking);
    } catch (error) {
      throw new RequestTimeoutException(UNABLE_TO_PROCESS_REQUEST.message, {
        description: UNABLE_TO_PROCESS_REQUEST.description,
      });
    }
    return newBooking;
  }
}
