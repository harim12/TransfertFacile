package com.RimHASSANI.demo.springsecurityjwt.model;

import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.SqlResultSetMapping;
import lombok.*;
@SqlResultSetMapping(
        name = "TransporteurInfoMapping",
        classes = @ConstructorResult(
                targetClass = TransporteurInfo.class,
                columns = {
                        @ColumnResult(name = "first_name"),
                        @ColumnResult(name = "last_name"),
                        @ColumnResult(name = "car_type")
                }
        )
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class TransporteurInfo {
    private String firstName;

    private String lastName;


    private String vehiculeImageUrl;



    // Getters and setters...
}