package com.RimHASSANI.demo.springsecurityjwt.model;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class PasswordEntity {
    public String oldPassword;

    public String newPassword;

    public String email;

}
