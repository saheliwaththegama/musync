import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Card from "./common/Card";
import PageContainer from "./common/PageContainer";

function AdminRoute({ children }) {
  const { currentUser, userProfile, authLoading } = useAuth();

  if (authLoading) {
    return (
      <PageContainer>
        <Card className="p-8 text-center">
          <p className="font-semibold text-slate-600">Checking access...</p>
        </Card>
      </PageContainer>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (userProfile?.role !== "admin") {
    return (
      <PageContainer>
        <Card className="p-10 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Admin access required
          </h1>
          <p className="mt-3 text-slate-600">
            This page is only available for authorised admin users.
          </p>
        </Card>
      </PageContainer>
    );
  }

  return children;
}

export default AdminRoute;