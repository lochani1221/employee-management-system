import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/V1/employees';

class EmployeeService {
    getEmployees() {
        return axios.get(BASE_URL);
    }

    createEmployee(employee) {
        return axios.post(BASE_URL, employee);
    }

    updateEmployee(id, employee) {
        return axios.put(`${BASE_URL}/${id}`, employee);
    }

    deleteEmployee(id) {
        return axios.delete(`${BASE_URL}/${id}`);
    }
}

export default new EmployeeService();
