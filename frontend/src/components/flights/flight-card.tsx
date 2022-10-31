import React, { FC } from "react";
import { Box, Card, Container, MenuItem, Select, Typography } from "@material-ui/core";

import { FlightStatuses } from "../../models/flight.model";

import { useUpdateFlightStatus } from "../../hooks/flights.hook";

interface FlightCardProps {
  code: string;
  origin: string;
  destination: string;
  passengers?: string[];
  status: FlightStatuses;
}

const mapFlightStatusToColor = (status: FlightStatuses) => {
  const mappings = {
    [FlightStatuses.Arrived]: "#1ac400",
    [FlightStatuses.Delayed]: "#c45800",
    [FlightStatuses["On Time"]]: "#1ac400",
    [FlightStatuses.Landing]: "#1ac400",
    [FlightStatuses.Cancelled]: "#ff2600",
  };

  return mappings[status] || "#000000";
};

export const FlightCard: React.FC<FlightCardProps> = (
  props: FlightCardProps
) => {
  const [status, setStatus] = React.useState<FlightStatuses>(props.status);
  const { mutate } = useUpdateFlightStatus();

  const handleChange = (e: any) => {
    setStatus(e.target.value);
    const payload = {
      code: props.code,
      status: e.target.value,
    };
    mutate(payload);
  }
  return (
    <Card
      style={{
        backgroundColor: "#f5f5f5",
        margin: "15px",
        padding: "35px",
        justifyContent: "center",
      }}
    >
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">{props.code} </Typography>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
          onChange={handleChange}
          style={{ color: mapFlightStatusToColor(status) }}
        >
          {Object.values(FlightStatuses).map(flightStatus => (
            <MenuItem value={flightStatus} key={flightStatus}>{flightStatus}</MenuItem>
          ))}
        </Select>
      </Box>

      <Box>
        <Typography>Origin: {props.origin}</Typography>
      </Box>
      <Box>
        <Typography>Destination: {props.destination}</Typography>
      </Box>
    </Card>
  );
};
