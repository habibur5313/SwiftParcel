import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Link } from "react-router";

export default function Unauthorized() {
     useEffect(() => {
          document.title = "Dashboard | SwiftParcel ";
        }, []);
  return (
    <div>
      <h1> Muri Khaa, tui authorized na....</h1>
      <Link to="/"><Button>Home</Button></Link>
    </div>
  );
}