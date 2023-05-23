import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [profile, setProfile] = useState({});
  const { data: session } = useSession();
  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    const isBulkShippingCustomer = session?.profile[0]?.bulk_shipLoad === '1';

    const allowWarehouseCarsRequests =
      session?.profile[0]?.allowWarehouseCarsRequests === '1';

    const fullName =
      locale === 'ar'
        ? session?.profile[0]?.full_name_ar
        : session?.profile[0]?.full_name;

    setProfile({
      ...session?.profile[0],
      fullName,
      isBulkShippingCustomer,
      allowWarehouseCarsRequests,
    });
  }, [session?.profile]);

  return (
    <UserContext.Provider value={{ profile }}>{children}</UserContext.Provider>
  );
}
