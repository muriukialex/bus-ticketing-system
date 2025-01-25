import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UNABLE_TO_PROCESS_REQUEST } from 'src/common/error-messages/error-messages';
import { Repository } from 'typeorm';
import { PatchTravellingBusDto } from '../dtos/patch-travelling-bus.dto';
import { TravellingBus } from '../travelling-bus.entity';

@Injectable()
export class UpdateTravellingBusProvider {
  constructor(
    /**
     * Inject travellingBusRepository
     */
    @InjectRepository(TravellingBus)
    private readonly travellingBusRepository: Repository<TravellingBus>,
  ) {}

  public async updateTravellingBus(
    patchTravellingBusDto: PatchTravellingBusDto,
  ) {
    let travellingBusToUpdate: PatchTravellingBusDto = null;

    try {
      travellingBusToUpdate = await this.travellingBusRepository.findOneBy({
        id: patchTravellingBusDto.id,
      });
    } catch (error) {
      throw new RequestTimeoutException(UNABLE_TO_PROCESS_REQUEST.message, {
        description: UNABLE_TO_PROCESS_REQUEST.description,
      });
    }

    travellingBusToUpdate.busName =
      patchTravellingBusDto.busName ?? travellingBusToUpdate.busName;
    travellingBusToUpdate.arrivalTime =
      patchTravellingBusDto.arrivalTime ?? travellingBusToUpdate.arrivalTime;
    travellingBusToUpdate.busSeats =
      patchTravellingBusDto.busSeats ?? travellingBusToUpdate.busSeats;
    travellingBusToUpdate.departureTime =
      patchTravellingBusDto.departureTime ??
      travellingBusToUpdate.departureTime;
    travellingBusToUpdate.priceOfTrip =
      patchTravellingBusDto.priceOfTrip ?? travellingBusToUpdate.priceOfTrip;
    travellingBusToUpdate.routeId =
      patchTravellingBusDto.routeId ?? travellingBusToUpdate.routeId;

    try {
      travellingBusToUpdate = await this.travellingBusRepository.save(
        travellingBusToUpdate,
      );
    } catch (error) {
      throw new RequestTimeoutException(UNABLE_TO_PROCESS_REQUEST.message, {
        description: UNABLE_TO_PROCESS_REQUEST.description,
      });
    }

    return travellingBusToUpdate;
  }
}
