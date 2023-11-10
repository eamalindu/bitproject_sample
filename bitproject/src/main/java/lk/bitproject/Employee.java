package lk.bitproject;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity //make as a persistence entity
@Table(name = "employee") //mapping table name with class name

@Data //using lombok to auto generate setter,getters,toString
@NoArgsConstructor() //default constructor
@AllArgsConstructor() //all argument constructor
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
    //backend validation (before sending data to DB)
    @Length(min = 10,max = 12,message = "NIC value must have either 10 or 12 Characters!")
    private String nic;

    @Column(name = "callingname")
    @NotNull
    private String callingname;

    @Column(name = "dob")
    @NotNull
    private LocalDate dob;

    @Column(name = "gender",length = 10)
    @NotNull
    private String gender;

    @Column(name = "email",unique = true,length = 150)
    @NotNull
    private String email; //150 unique

    @Column(name = "mobilenumber",length = 10)
    @NotNull
    private String mobileNumber; //10

    @Column(name = "landnumber",length = 10)
    private String landNumber; //10

    @Column(name = "address")
    @NotNull
    private String address;

    @Column(name = "civilstatus",length = 10)
    @NotNull
    private String civilStatus; //10

    @Column(name = "note")
    @NotNull
    private String note;

    @Column(name = "added_datetime")
    @NotNull
    private LocalDateTime addedDateTime;

    @ManyToOne //Relationship
    @JoinColumn(name = "employeestatus_id",referencedColumnName = "id") //CoulmnName and Reference Table Column Name
    private EmployeeStatus employeestatusid;

    @ManyToOne
    @JoinColumn(name = "designation_id",referencedColumnName = "id")
    private Designation designationid;





}
