package net.javaguides.springboot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DepartmentEmployeeCountDTO {
    private String departmentName;
    private long employeeCount;
}
