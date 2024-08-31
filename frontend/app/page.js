// import * as React from 'react';
// import { Grid, Hidden } from '@mui/material';
// import { MainNav } from "@/components/navbar/main-nav";
// import { SideNav } from "@/components/navbar/side-nav";

// export default function Home() {
//   return (
//     <Grid container sx={{ height: '100vh' }}>
//       <Hidden smDown>
//         <Grid item xs={false} sm={3} sx={{ height: '100vh' }}>
//           <SideNav />
//         </Grid>
//       </Hidden>
//       <Grid item xs={12} sm={9} sx={{ height: '100vh', overflowY: 'auto' }}>
//         <MainNav />
//       </Grid>
//     </Grid>
//   );
// }

import Image from "next/image";
import styles from "./page.module.css";
import { MainNav } from "@/components/navbar/main-nav";
import { SideNav } from "@/components/navbar/side-nav";
import Dashboard from "@/components/dashboard/dashboard";
import { Grid, Box } from "@mui/material";

export default function Home() {
  return (
    <>
      <div style={{ display: "flex" }}>
      
        <div style={{ width: "240px" }}>
          <SideNav />
        </div>
        <div style={{ flex: 1 }}>
          <MainNav />
          <Dashboard />
        </div>
      </div>
     
    </>
  );
}
