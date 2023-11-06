package lk.bitproject;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Table(name = "module")
@Data
public class Module {

    @Id
    @Column(name = "id",unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Auto Increment
    private Integer id;

    @Column(name = "name")
    @NotNull
    private String name;
}
