import React, { Dispatch, SetStateAction, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import axios from "axios";

interface propsType {
  searchPositions: {
    lat: number;
    lng: number;
  } | null;
  setSearchPositions: Dispatch<SetStateAction<{
      lat: number;
      lng: number;
    } | null>
  >;
}

export default function SearchLocation({
  setSearchPositions,
  searchPositions,
}: propsType) {
  const [isSearch, setISearch] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [listPlace, setListPlace] = useState([]);

  async function ApiCall(searchString: string) {
    await axios
      .get(
        `https://nominatim.openstreetmap.org/search?q=${searchString}&format=json&addressdetails=1&polygon_svg=1`
      )
      .then((res) => {
        console.log(res.data);
        setListPlace(res.data);
      })
      .catch((res) => console.log("error", res));
  }
  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          value={search}
          onChange={(e) => {
            setISearch(true);
            setSearch(e.target.value);
            ApiCall(e.target.value);
            if (e.target.value === "") setISearch(false);
          }}
        />
      </Box>
      {isSearch && (
        <div className="absolute index-value">
          <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <List>
              {listPlace.map((item: any) => {
                return (
                  <>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => {
                          setISearch(false);
                          setSearchPositions({lat:item.lat,lng:item.lon})
                        }}
                      >
                        <ListItemText primary={item.display_name} />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </>
                );
              })}
            </List>
          </Box>
        </div>
      )}
    </>
  );
}
