package lk.bitproject;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "privilege")

@Data
@NoArgsConstructor() //default constructor
@AllArgsConstructor() //all argument constructor
public class Privilege {

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

    //foreign keys
    @ManyToOne
    @JoinColumn(name = "role_id",referencedColumnName = "id")
    private Role role_id;

    @ManyToOne
    @JoinColumn(name = "module_id",referencedColumnName = "id")
    private Module module_id;


}
