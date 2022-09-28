import NavBar from "../NavBar/NavBar";
import jsPDF from "jspdf";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";
import IsValidUser from "../isValidUser/isValidUser";
import isCustomerLoggedIn from "../isCustomerLoggedIn/isCustomerLoggedIn";

import { useEffect, useState } from "react";
function InstallmentPaymentReceipt() {
  const userName = useParams().username;
  const username = useLocation().state[0];
  const accountNo = useLocation().state[1];
  const date = useLocation().state[2];
  const paymentType = useLocation().state[3];
  const installAmount = useLocation().state[4];
  const penaltyfee = useLocation().state[5];
  const taxAmount = useLocation().state[6];
  const totalPayAmount = useLocation().state[7];
  const [isLoggedIn, updateIsLoggedIn] = useState();
  useEffect(() => {
    isLoggedIn();
    async function isLoggedIn() {
      updateIsLoggedIn(await isCustomerLoggedIn(userName));
      console.log(isLoggedIn);
    }
  }, []);

  if (!isLoggedIn) {
    return <IsValidUser />;
  }
  const printDocument = () => {
    // const input = document.getElementById("divToPrint");
    // html2canvas(input).then((canvas) => {
    //   const imgData = canvas.toDataURL("image/png");
    //   const pdf = new jsPDF("p", "mm", "a4");
    //   const pageWidth = pdf.internal.pageSize.getWidth();
    //   const pageHeight = pdf.internal.pageSize.getHeight();

    //   const widthRatio = pageWidth / canvas.width;
    //   const heightRatio = pageHeight / canvas.height;
    //   const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

    //   const canvasWidth = canvas.width * ratio;
    //   const canvasHeight = canvas.height * ratio;

    //   const marginX = (pageWidth - canvasWidth) / 2;
    //   const marginY = 0;
    //   pdf.addImage(
    //     imgData,
    //     "JPEG",
    //     marginX,
    //     marginY,
    //     canvasWidth,
    //     canvasHeight
    //   );
    //   //   pdf.output("dataurlnewwindow");
    //   pdf.save("download.pdf");
    // });
  };

  return (
    <>
      <NavBar />

      <div class="body-wrap">
        {/* <button
          style={{
            color: "white",
            background: "blue",
            width: "100px",
            height: "50px",
            margin: "20px",
            float: "right",
            padding: "10px",
          }}
          onClick={printDocument}
        >
          Download
        </button> */}
        <table class="body-wrap">
          <tbody>
            <tr>
              <td></td>
              <td class="containerPPR1" width="300">
                <div class="contentPPR">
                  <table
                    class="main"
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    id="divToPrint"
                  >
                    <tbody>
                      <tr>
                        <td class="contentPPR-wrap aligncenter">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tbody>
                              <tr>
                                <td class="contentPPR-block">
                                  <h5>payment recieved</h5>
                                </td>
                              </tr>
                              <tr>
                                <td class="contentPPR-block">
                                  <table class="invoice">
                                    <tbody>
                                      <tr>
                                        <td>
                                          <b>Name:</b> {username}
                                          <br />
                                          <b>Account Number:</b>
                                          {accountNo}
                                          <br />
                                          <b>Date:</b>
                                          {date}
                                          <br />
                                          <b>Payment Method:</b> {paymentType}
                                        </td>
                                      </tr>
                                      <br />
                                      <tr>
                                        <td>
                                          <table
                                            class="invoice-items"
                                            cellpadding="0"
                                            cellspacing="0"
                                          >
                                            <tbody>
                                              <tr>
                                                <td>Installment Amount</td>
                                                <td class="alignright">
                                                  {installAmount}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Penalty Fee</td>
                                                <td class="alignright">
                                                  {penaltyfee}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Tax</td>
                                                <td class="alignright">
                                                  {taxAmount}
                                                </td>
                                              </tr>

                                              <tr class="total">
                                                <td
                                                  class="alignright"
                                                  width="80%"
                                                >
                                                  Total
                                                </td>
                                                <td class="alignright">
                                                  {totalPayAmount}
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/* <div class="footer">
                      <table width="100%">
                        <tbody>
                          <tr>
                            <td class="aligncenter contentPPR-block">
                              Questions? Email{" "}
                              <a href="mailto:">support@company.inc</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div> */}
                </div>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      
    </>
  );
}
export default InstallmentPaymentReceipt;
