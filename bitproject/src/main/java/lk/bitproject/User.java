package lk.bitproject;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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

    @Column(name = "username",unique = true,length = 150)
    @NotNull
    private String username;

    @Column(name = "password",length = 225)
    @NotNull
    private String password;

    @Column(name = "email",length = 150)
    @NotNull
    private String email;

    @Column(name = "photopath",length = 150)
    private String photoPath;

    private Boolean status;

    private LocalDateTime addedDateTime;

    private String note;


}
