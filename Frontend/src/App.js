import "./App.css";
import Login from "./Components/Login/Login";
import CustomerDashboard from "./Components/CustomerDashboard/CustomerDashboard.";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import AddEmployee from "./Components/AddEmployee/AddEmployee";
import Register from "./Components/Register/Register";
import ViewEmployee from "./Components/ViewEmployee/ViewEmployee";
import { Route, Routes } from "react-router-dom";
import AddAgent from "./Components/AddAgent/AddAgent";
import AdminProfile from "./Components/AdminProfile/AdminProfile";
import ViewAgent from "./Components/ViewAgent/ViewAgent";
import ViewFeedback from "./Components/ViewFeedback/ViewFeedback";
import ViewCommission from "./Components/ViewCommission/ViewCommission";
import ViewCustomer from "./Components/ViewCustomer/ViewCustomer";
import AddCity from "./Components/AddCity/AddCity";
import AddState from "./Components/AddState/AddState";
import ViewCity from "./Components/ViewCity/ViewCity";
import ViewCommissionWithdrawal from "./Components/ViewCommissionWithdrawal/ViewCommissionWithdrawal";
import ViewState from "./Components/ViewState/ViewState";
import InsuranceAccount from "./Components/InsuranceAccount/InsuranceAccount";
import ViewPolicyPayment from "./Components/ViewPolicyPayment/ViewPolicyPayment";
import ViewPolicyClaim from "./Components/ViewPolicyClaim/ViewPolicyClaim";
import AddInsuranceType from "./Components/AddInsuranceType/AddInsuranceType";
import ViewInsuranceType from "./Components/ViewInsuranceType/ViewInsuranceType";
import AddInsuranceScheme from "./Components/AddInsuranceScheme/AddInsuranceScheme";
import ViewInsuranceScheme from "./Components/ViewInsuranceScheme/ViewInsuranceScheme";
import AddInsurancePlan from "./Components/AddInsurancePlan/AddInsurancePlan";
import ViewInsurancePlan from "./Components/ViewInsurancePlan/ViewInsurancePlan";
import TaxSettings from "./Components/TaxSettings/TaxSettings";
import InsuranceSettings from "./Components/InsuranceSettings/InsuranceSettings";
import Profile from "./Components/Profile/Profile";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import EmployeeDashboard from "./Components/EmployeeDashboard/EmployeeDashboard";
import AddAgentEmp from "./Components/AddAgentEmp/AddAgentEmp";
import ViewAgentEmp from "./Components/ViewAgentEmp/ViewAgentEmp";
import ViewFeedbackEmp from "./Components/ViewFeedbackEmp/ViewFeedbackEmp";
import ViewCommissionEmp from "./Components/ViewCommissionEmp/ViewCommissionEmp";
import ViewCommissionWithdrawalEmp from "./Components/ViewCommissionWithdrawalEmp/ViewCommissionWithdrawalEmp";
import ViewCustomerEmp from "./Components/ViewCustomerEmp/ViewCustomerEmp";
import ViewStateEmp from "./Components/ViewStateEmp/ViewStateEmp";
import ViewCityEmp from "./Components/ViewCityEmp/ViewCityEmp";
import ViewInsuranceTypeEmp from "./Components/ViewInsuranceTypeEmp/ViewInsuranceTypeEmp";
import ViewInsuranceSchemeEmp from "./Components/ViewInsuranceSchemeEmp/ViewInsuranceSchemeEmp";
import ViewInsurancePlanEmp from "./Components/ViewInsurancePlanEmp/ViewInsurancePlanEmp";
import AgentMarketing from "./Components/AgentMarketing/AgentMarketing";
import InterestCalculator from "./Components/InterestCalculator/InterestCalculator";
import InsuranceScheme from "./Components/InsuranceScheme/InsuranceScheme";
import InsuranceSchemeDetails from "./Components/InsuranceSchemeDetails/InsuranceSchemeDetails";
import InsuranceAccountDetails from "./Components/InsuranceAccountDetails/InsuranceAccountDetails";
import PolicyPayment from "./Components/PolicyPayment/PolicyPayment";
import PolicyPaymentReceipt from "./Components/policyPaymentReceipt/policyPaymentReceipt";
import CustomerGiveFeedback from "./Components/CustomerGiveFeedback/CustomerGiveFeedback";
import CustomerViewFeedback from "./Components/CustomerViewFeedback/CustomerViewFeedback";
import CustomerChangePassword from "./Components/CustomerChangePassword/CustomerChangePassword";
import CustomerProfile from "./Components/CustomerProfile/CustomerProfile";
import CustomerDocument from "./Components/CustomerDocument/CustomerDocument";
import CustomerInsuranceAccount from "./Components/CustomerInsuranceAccount/CustomerInsuranceAccount";
import AgentDashboard from "./Components/AgentDashboard/AgentDashboard";
import AgentProfile from "./Components/AgentProfile/AgentProfile";
import AgentChangePassword from "./Components/AgentChangePassword/AgentChangePassword";
import AgentViewCustomer from "./Components/AgentViewCustomer/AgentViewCustomer";
import AgentInsuranceAccount from "./Components/AgentInsuranceAccount/AgentInsuranceAccount";
import AgentViewPolicyPayment from "./Components/AgentViewPolicyPayment/AgentViewPolicyPayment";
import AgentViewPolicyClaim from "./Components/AgentViewPolicyClaim/AgentViewPolicyClaim";
import AgentViewCommission from "./Components/AgentViewCommission/AgentViewCommission";
import AgentViewCommissionWithdrawal from "./Components/AgentViewCommissionWithdrawal/AgentViewCommissionWithdrawal";
import AgentWithdrawAmount from "./Components/AgentWithdrawAmount/AgentWithdrawAmount";
import ViewAllInstallments from "./Components/ViewAllInstallments/ViewAllInstallments";
import InstallmentPayment from "./Components/InstallmentPayment/InstallmentPayment";
import InstallmentPaymentReceipt from "./Components/InstallmentPaymentReceipt/InstallmentPaymentReceipt";
function App() {
  return (
    <>
    <ScrollToTop className = "body">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/Register" element={<Register />} />
        <Route
          exact
          path="/CustomerDashboard/:username"
          element={<CustomerDashboard />}
        />
        <Route
          exact
          path="/AdminDashboard/:username"
          element={<AdminDashboard />}
        />
        <Route
          exact
          path="/AdminDashboard/AddEmployee/:username"
          element={<AddEmployee />}
        />
        <Route
          exact
          path="/AdminDashboard/ViewEmployee/:username"
          element={<ViewEmployee />}
        />
        <Route
          exact
          path="/AdminDashboard/AdminProfile/:username"
          element={<AdminProfile />}
        />
        <Route
          exact
          path="/AdminDashboard/AddAgent/:username"
          element={<AddAgent />}
        />
        <Route
          exact
          path="/AdminDashboard/ViewAgent/:username"
          element={<ViewAgent />}
        />
        {/* {[
          "/AdminDashboard/ViewFeedback/:username",
          "/EmployeeDashboard/ViewFeedback/:username",
        ].map((path) => (
          <Route path={path} element={<ViewFeedback />} />
        ))} */}
        <Route
          exact
          path="/AdminDashboard/ViewFeedback/:username"
          element={<ViewFeedback />}
        />
        <Route
          exact
          path="/AdminDashboard/ViewCommission/:username"
          element={<ViewCommission />}
        />
        <Route
          exact
          path="/AdminDashboard/ViewCommissionWithdrawal/:username"
          element={<ViewCommissionWithdrawal />}
        />
        <Route
          exact
          path="/AdminDashboard/ViewCustomer/:username"
          element={<ViewCustomer />}
        />
        <Route
          exact
          path="/AdminDashboard/AddCity/:username"
          element={<AddCity />}
        />
        <Route
          exact
          path="/AdminDashboard/AddState/:username"
          element={<AddState />}
        />
        <Route
          exact
          path="/AdminDashboard/ViewCity/:username"
          element={<ViewCity />}
        />
        <Route
          exact
          path="/AdminDashboard/ViewState/:username"
          element={<ViewState />}
        />
        <Route
          exact
          path="/AdminDashboard/InsuranceAccount/:username"
          element={<InsuranceAccount />}
        />
        <Route
          exact
          path="/AdminDashboard/ViewPolicyPayment/:username"
          element={<ViewPolicyPayment />}
        />
        <Route
          exact
          path="/AdminDashboard/ViewPolicyClaim/:username"
          element={<ViewPolicyClaim />}
        />
        <Route
          exact
          path="/AdminDashboard/AddInsuranceType/:username"
          element={<AddInsuranceType />}
        />
        <Route
          exact
          path="/AdminDashboard/ViewInsuranceType/:username"
          element={<ViewInsuranceType />}
        />
        <Route
          exact
          path="/AdminDashboard/AddInsuranceScheme/:username"
          element={<AddInsuranceScheme />}
        />
        <Route
          exact
          path="/AdminDashboard/ViewInsuranceScheme/:username"
          element={<ViewInsuranceScheme />}
        />
        <Route
          exact
          path="/AdminDashboard/AddInsurancePlan/:username"
          element={<AddInsurancePlan />}
        />
        <Route
          exact
          path="/AdminDashboard/ViewInsurancePlan/:username"
          element={<ViewInsurancePlan />}
        />
        <Route
          exact
          path="/AdminDashboard/TaxSettings/:username"
          element={<TaxSettings />}
        />
        <Route
          exact
          path="/AdminDashboard/InsuranceSettings/:username"
          element={<InsuranceSettings />}
        />
        <Route
          exact
          path="/AdminDashboard/Profile/:username"
          element={<Profile />}
        />
        <Route
          exact
          path="/AdminDashboard/ChangePassword/:username"
          element={<ChangePassword />}
        />

        {/* Employee routes */}
        {/*___________________________________________________________________*/}
        <Route
          exact
          path="/EmployeeDashboard/Profile/:username"
          element={<Profile />}
        />
        <Route
          exact
          path="/EmployeeDashboard/ChangePassword/:username"
          element={<ChangePassword />}
        />
        <Route
          exact
          path={"/EmployeeDashboard/AddAgent/:username"}
          element={<AddAgentEmp />}
        />
        <Route
          exact
          path={"/EmployeeDashboard/ViewAgent/:username"}
          element={<ViewAgentEmp />}
        />
        <Route
          exact
          path="/EmployeeDashboard/ViewFeedback/:username"
          element={<ViewFeedbackEmp />}
        />
        <Route
          exact
          path="/EmployeeDashboard/ViewCommission/:username"
          element={<ViewCommissionEmp />}
        />
        <Route
          exact
          path="/EmployeeDashboard/ViewCommissionWithdrawal/:username"
          element={<ViewCommissionWithdrawalEmp />}
        />
        <Route
          exact
          path="/EmployeeDashboard/ViewCustomer/:username"
          element={<ViewCustomerEmp />}
        />
        <Route
          exact
          path="/EmployeeDashboard/:username"
          element={<EmployeeDashboard />}
        />

        <Route
          exact
          path="/EmployeeDashboard/ViewState/:username"
          element={<ViewStateEmp />}
        />
        <Route
          exact
          path="/EmployeeDashboard/ViewCity/:username"
          element={<ViewCityEmp />}
        />
        <Route
          exact
          path="/EmployeeDashboard/ViewInsuranceType/:username"
          element={<ViewInsuranceTypeEmp />}
        />
        <Route
          exact
          path="/EmployeeDashboard/ViewInsuranceScheme/:username"
          element={<ViewInsuranceSchemeEmp />}
        />
        <Route
          exact
          path="/EmployeeDashboard/ViewInsurancePlan/:username"
          element={<ViewInsurancePlanEmp />}
        />

        {/* ------------------------Agent----------------------------- */}
        <Route
          exact
          path="/AgentDashboard/Marketing/:username"
          element={<AgentMarketing />}
        />
        <Route
          exact
          path="/AgentDashboard/:username"
          element={<AgentDashboard />}
        />
        <Route
          exact
          path="/AgentDashboard/Profile/:username"
          element={<AgentProfile />}
        />
        <Route
          exact
          path="/AgentDashboard/ChangePassword/:username"
          element={<AgentChangePassword />}
        />
        <Route
          exact
          path="/AgentDashboard/ViewCustomer/:username"
          element={<AgentViewCustomer />}
        />
        <Route
          exact
          path="/AgentDashboard/InsuranceAccount/:username"
          element={<AgentInsuranceAccount />}
        />
        <Route
          exact
          path="/AgentDashboard/PolicyPayment/:username"
          element={<AgentViewPolicyPayment />}
        />
        <Route
          exact
          path="/AgentDashboard/PolicyClaim/:username"
          element={<AgentViewPolicyClaim />}
        />
        <Route
          exact
          path="/AgentDashboard/Commission/:username"
          element={<AgentViewCommission />}
        />
        <Route
          exact
          path="/AgentDashboard/CommissionWithdrawal/:username"
          element={<AgentViewCommissionWithdrawal />}
        />
        <Route
          exact
          path="/AgentDashboard/WithdrawAmount/:username"
          element={<AgentWithdrawAmount />}
        />
        {/* _________________________customer--------------------------- */}

        <Route
          exact
          path="/CustomerDashboard/InterestCalculator/:username"
          element={<InterestCalculator />}
        />
        <Route
          exact
          path="/CustomerDashboard/InsuranceScheme/:username"
          element={<InsuranceScheme />}
        />
        <Route
          exact
          path="/CustomerDashboard/InsuranceSchemeDetails/:username"
          element={<InsuranceSchemeDetails />}
        />
        <Route
          exact
          path="/CustomerDashboard/InsuranceAccountDetails/:username"
          element={<InsuranceAccountDetails />}
        />
        <Route
          exact
          path="/CustomerDashboard/PolicyPayment/:username"
          element={<PolicyPayment />}
        />
        <Route
          exact
          path="/CustomerDashboard/PolicyPaymentReceipt/:username"
          element={<PolicyPaymentReceipt />}
        />
        <Route
          exact
          path="/CustomerDashboard/Enquiry/:username"
          element={<CustomerGiveFeedback />}
        />
        <Route
          exact
          path="/CustomerDashboard/CustomerViewFeedback/:username"
          element={<CustomerViewFeedback />}
        />
        <Route
          exact
          path="/CustomerDashboard/CustomerChangePassword/:username"
          element={<CustomerChangePassword />}
        />
        <Route
          exact
          path="/CustomerDashboard/CustomerProfile/:username"
          element={<CustomerProfile />}
        />
        <Route
          exact
          path="/CustomerDashboard/CustomerDocument/:username"
          element={<CustomerDocument />}
        />
        <Route
          exact
          path="/CustomerDashboard/InsuranceAccount/:username"
          element={<CustomerInsuranceAccount />}
        />
        <Route
          exact
          path="/CustomerDashboard/Installments/:username"
          element={<ViewAllInstallments />}
        />
        <Route
          exact
          path="/CustomerDashboard/InstallmentPayment/:username"
          element={<InstallmentPayment />}
        />
        <Route
          exact
          path="/CustomerDashboard/InstallmentPaymentReceipt/:username"
          element={<InstallmentPaymentReceipt />}
        />
      </Routes>
    </ScrollToTop>
    </>
  );
}

export default App;
