package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HotsixApplication {

	public static void main(String[] args) {
		EnvLoader.loadEnv();
		SpringApplication.run(HotsixApplication.class, args);
	}

}
