package com.example.demo.DTO;

import lombok.Builder;
import org.apache.logging.log4j.message.Message;

@Builder
public record ChatRequestDTO (String model,Message[] messages) {

}
messages@Builder
public record massage (String role, String content) {

}