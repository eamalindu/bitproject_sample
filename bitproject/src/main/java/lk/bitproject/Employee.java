package lk.bitproject;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity //make as a persistence entity
@Table(name = "employee") //mapping table name with class name
@Data //using lombok to auto generate setter,getters,toString
public class Employee {

    @Id //Primary Key
    @Column(name = "id",unique = true) //Column Mapping
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Auto Increment
    private Integer id;

    @Column(name = "empnumber",unique = true,length = 10)
    @NotNull //Not Null
    private String empnumber;

    @Column(name = "fullname")
    @NotNull
    private String fullname;

    @Column(name = "nic",unique = true,length = 12)
    @NotNull
    private String nic;

    @Column(name = "callingname")
    @NotNull
    private String callingname;

    @ManyToOne //Relationship
    @JoinColumn(name = "employeestatus_id",referencedColumnName = "id") //CoulmnName and Reference Table Column Name
    private EmployeeStatus employeestatusid;

    @ManyToOne
    @JoinColumn(name = "designation_id",referencedColumnName = "id")
    private Designation designationid;





}
