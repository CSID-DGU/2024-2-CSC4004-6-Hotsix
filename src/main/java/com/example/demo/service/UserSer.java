package com.example.demo.service;

import com.example.demo.repository.UserRep;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserSer {
    private final UserRep userRep;


}
