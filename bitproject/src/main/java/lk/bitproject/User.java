package lk.bitproject;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "user")

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @Column(name = "id",unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String username;

    private String password;

    private String email;

    private String photoPath;

    private Boolean status;

    private LocalDateTime addedDateTime;

    private String note;


}
