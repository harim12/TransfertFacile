package com.RimHASSANI.demo.springsecurityjwt.model;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class UserInfo {
    private String firstName;

    private String lastName;

    private Integer phoneNumber;

}
