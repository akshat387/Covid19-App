import React from "react";
import "./InforBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

function infobox({ title, cases, isRed, active, total, ...props }) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "inforBox--red"
      }`}
    >
      <CardContent>
        <Typography className="infoBox_title" colour="textSecondary">
          {title}
        </Typography>

        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
          {cases}
        </h2>

        <Typography className="infoBox_total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default infobox;
