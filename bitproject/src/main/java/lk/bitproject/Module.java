package lk.bitproject;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "module")
@Data
public class Module {

    @Id
    @Column(name = "id",unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Auto Increment
    private Integer id;


    private String name;
}
