import { colors } from '@/constants/colors';
import { theme } from '@/utils/theme';
import React, { useState } from 'react';
import {
    Control,
    Controller,
    FieldValues,
    UseFormSetFocus,
} from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { TextInput as Input, Text } from 'react-native-paper';

interface FormBuilderProps<T extends FieldValues> {
    control: Control<T, any>;
    setFocus: UseFormSetFocus<T>;
    formConfigArray: any;
}

export default function FormBuilder<T extends FieldValues>({
    control,
    setFocus,
    formConfigArray,
    ...props
}: FormBuilderProps<T>) {
    const [showPassword, setShowPassword] = useState(true);
    return (
        <View>
            {formConfigArray.map((fieldConfig: any, index: any) => {
                const {
                    type,
                    name,
                    rules,
                    textContentType,
                    secureTextEntry,
                    keyboardType,
                    description,
                    ...textInputProps
                } = fieldConfig;
                return (
                    <View key={index} style={styles.container}>
                        <Controller
                            control={control}
                            name={name}
                            rules={rules}
                            render={({
                                field: { onChange, onBlur, value },
                                fieldState: { error },
                            }) => (
                                <>
                                    <Input
                                        onChangeText={text => {
                                            onChange(text);
                                        }}
                                        keyboardType={keyboardType}
                                        secureTextEntry={
                                            type === 'password' && showPassword
                                        }
                                        right={
                                            type === 'password' && (
                                                <Input.Icon
                                                    icon={
                                                        showPassword
                                                            ? 'eye'
                                                            : 'eye-off'
                                                    }
                                                    onPress={() =>
                                                        setShowPassword(
                                                            !showPassword
                                                        )
                                                    }
                                                />
                                            )
                                        }
                                        onBlur={onBlur}
                                        value={value}
                                        onSubmitEditing={() =>
                                            setFocus && setFocus(name)
                                        }
                                        style={styles.input}
                                        outlineStyle={{
                                            borderColor: colors.yellow,
                                        }}
                                        selectionColor={theme.colors.primary}
                                        underlineColor="transparent"
                                        mode="outlined"
                                        textColor={theme.colors.text}
                                        theme={{
                                            colors: {
                                                // text input placeholder
                                                placeholder:
                                                    theme.colors.secondary,
                                                // text input label
                                                primary: colors.yellow,
                                            },
                                        }}
                                        {...textInputProps}
                                    />
                                    {error?.message ? (
                                        <Text style={styles.error}>
                                            {error.message}
                                        </Text>
                                    ) : null}
                                    {description && !error?.message ? (
                                        <Text style={styles.description}>
                                            {description}
                                        </Text>
                                    ) : null}
                                </>
                            )}
                            {...props}
                        />
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 12,
    },
    input: {
        backgroundColor: theme.colors.surface,
    },
    description: {
        fontSize: 13,
        color: theme.colors.secondary,
        paddingTop: 8,
    },
    error: {
        fontSize: 13,
        color: theme.colors.error,
        paddingTop: 8,
    },
});
