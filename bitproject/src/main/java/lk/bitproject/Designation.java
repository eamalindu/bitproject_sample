package lk.bitproject;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "designation")
@Data
@NoArgsConstructor() //default constructor
@AllArgsConstructor() //all argument constructor
public class Designation {

    @Id
    @Column(name = "id",unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "des")
    private String des;
}
