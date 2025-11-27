package com.klef.dev;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class JournalBackendApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(JournalBackendApplication.class, args);
        System.out.println("Research Journal Management System backend is running...");
    }
}
