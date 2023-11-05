package lk.bitproject;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "designation")
@Data
public class Designation {

    @Id
    @Column(name = "id",unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "des")
    private String des;
}
