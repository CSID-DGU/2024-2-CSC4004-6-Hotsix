package com.example.demo.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum TransportType {
    CAR("자차"),          // 자동차
    PUBLIC("대중교통"),    // 대중교통
    WALK("도보");         // 도보

    private final String value;

    TransportType(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value; // JSON 직렬화 시 문자열로 변환
    }

    @JsonCreator
    public static TransportType fromValue(String value) {
        for (TransportType type : TransportType.values()) {
            if (type.getValue().equalsIgnoreCase(value)) { // 값 매핑
                return type;
            }
        }
        throw new IllegalArgumentException("Unknown value: " + value);
    }

    @Override
    public String toString() {
        return this.value;
    }
}