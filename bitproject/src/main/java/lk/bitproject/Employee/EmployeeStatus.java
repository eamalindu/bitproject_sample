package lk.bitproject.Employee;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "employeestatus")
@Data
public class EmployeeStatus {

    @Id
    @Column(name = "id",unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "status")
    private String status;
}
