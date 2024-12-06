package com.bupjangsa.type;

import jakarta.persistence.AttributeConverter;

import java.util.Arrays;
import java.util.Objects;

import static com.bupjangsa.constant.MessageConst.UNKNOWN_ERROR;

public enum BoardType {
    FREE_BOARD,NOTICE,NEWS,YOUNGSAN,GALLERY;

    public static class Converter implements AttributeConverter<BoardType, String> {

        @Override
        public String convertToDatabaseColumn(final BoardType attribute) {
            if (attribute == null) {
                return null;
            }
            return attribute.name();
        }

        @Override
        public BoardType convertToEntityAttribute(final String dbData) {
            if (dbData == null) {
                return null;
            }
            return Arrays.stream(BoardType.values())
                    .filter(csReasonCode -> Objects.equals(csReasonCode.name(), dbData))
                    .findAny()
                    .orElseThrow(() -> new RuntimeException(UNKNOWN_ERROR.getMessage()));
        }
    }
}
