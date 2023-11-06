package lk.bitproject;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Table(name = "privilege")
@Data
public class privilege {

    @Id
    @Column(name = "id",unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Auto Increment
    private Integer id;

    @Column(name = "sel")
    @NotNull
    private Boolean select;

    @Column(name = "inst")
    @NotNull
    private Boolean insert;

    @Column(name = "upd")
    @NotNull
    private Boolean update;

    @Column(name = "del")
    @NotNull
    private Boolean delete;

    //need to add foreign keys


}
