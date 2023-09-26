package com.RimHASSANI.demo.springsecurityjwt.controller;

import com.RimHASSANI.demo.springsecurityjwt.model.DemandeEntity;
import com.RimHASSANI.demo.springsecurityjwt.model.TransporteurInfo;
import com.RimHASSANI.demo.springsecurityjwt.model.UserInfo;
import com.RimHASSANI.demo.springsecurityjwt.service.TransporteurService;
import com.RimHASSANI.demo.springsecurityjwt.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public String helloUserController(){
        return "User access level";
    }



    @GetMapping("/get/{email}/info")
    public ResponseEntity<UserInfo> getTransporteurInfo(@PathVariable String email) {
        UserInfo userInfo = userService.getUserInfoByEmail(email);
        if (userInfo != null) {
            return ResponseEntity.ok(userInfo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
