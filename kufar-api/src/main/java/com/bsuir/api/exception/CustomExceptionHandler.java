package com.bsuir.api.exception;

import lombok.extern.log4j.Log4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

//@Log4j
//TODO to read?
@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    public ResponseEntity<Object> exception(Exception ex, WebRequest request) throws Exception {
        //Лог
        return handleException(ex, request);
    }
}
