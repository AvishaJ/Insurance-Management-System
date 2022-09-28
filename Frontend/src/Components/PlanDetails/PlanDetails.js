import { useState } from "react";
import Table from "react-bootstrap/Table";
function PlanDetails(props) {
  const insuranceScheme = props.insuranceScheme;

  const [policyTermMinimum, updatePolicyTermMinimum] = useState("");
  const [policyTermMaximum, updatePolicyTermMaximum] = useState("");
  const [minimumAge, updateMinimumAge] = useState("");
  const [maximumAge, updateMaximumAge] = useState("");
  const [minimumInvestmentAmount, updateMinimumInvestmentAmount] = useState("");
  const [maximumInvestmentAmount, updateMaximumInvestmentAmount] = useState("");
  const [profitRatio, updateProfitRatio] = useState("");
  return (
    <>
      <>
        <h2
          className="h2"
          style={{
            color: "purple",

            textStyle: "bold",
          }}
        >
          Plan Details
        </h2>
        <br />
        <Table striped bordered hover size="sm">
          {
            <tbody>
              <tr>
                <th style={{ width: "30%", height: "50%" }}>
                  Policy term-minimum :
                </th>
                <td>{insuranceScheme.minTermPlan}</td>
              </tr>
              <tr>
                <th style={{ width: "30%", height: "50%" }}>
                  Policy term-maximum :
                </th>
                <td>{insuranceScheme.maxTermPlan}</td>
              </tr>
              <tr>
                <th style={{ width: "30%", height: "50%" }}>Minimum Age :</th>
                <td>{insuranceScheme.minAge}</td>
              </tr>
              <tr>
                <th style={{ width: "30%", height: "50%" }}>Maximum Age :</th>
                <td>{insuranceScheme.maxAge}</td>
              </tr>
              <tr>
                <th style={{ width: "30%", height: "50%" }}>
                  Minimum Investment Amount :
                </th>
                <td>{insuranceScheme.minInvestment}</td>
              </tr>
              <tr>
                <th style={{ width: "30%", height: "50%" }}>
                  Maximum Investment Amount :
                </th>
                <td>{insuranceScheme.maxInvestment}</td>
              </tr>
              <tr>
                <th style={{ width: "30%", height: "50%" }}>Profit Ratio :</th>
                <td>{insuranceScheme.profitRatio}</td>
              </tr>
            </tbody>
          }
        </Table>
      </>
    </>
  );
}
export default PlanDetails;
