import React from "react";
import { Text, View } from "../components/Themed";

import Colors from "../constants/Colors";

interface Props {
  status: string | undefined;
}

const Status: React.FC<Props> = ({ status }) => {
  if (status === "Alive") {
    return <Text style={{ color: Colors.alive }}>{status}</Text>;
  }
  if (status === "Dead") {
    return <Text style={{ color: Colors.dead }}>{status}</Text>;
  }
  if (status === "unknown") {
    return <Text style={{ color: Colors.primary }}>{status}</Text>;
  }
};

export default Status;
