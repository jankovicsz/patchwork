
const TableItem = ({fullName, yearOfBirth, isVaccinated, email}) => {
    return (
  
      <tr >
        <td>{fullName}</td>
        <td>{yearOfBirth}</td>
        <td>{isVaccinated ? "✔️" : "❌"}</td>
        <td>{email}</td>
      </tr>
    )
  
  }
  
  export default TableItem