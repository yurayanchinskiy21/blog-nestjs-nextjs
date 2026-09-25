"use client";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
export default function PostsFilters() {
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    shallow: false,
  });
  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: "publishOn",
    shallow: false,
  });
  const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
    defaultValue: "DESC",
    shallow: false,
  });
  const [inputValue, setInputValue] = useState(search);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void setSearch(inputValue || null);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue, setSearch]);
  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
      <TextField
        fullWidth
        label='Search posts'
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        sx={{
          "& .MuiInputBase-input": { color: "#fff" },
          "& .MuiInputLabel-root": { color: "#aaa" },
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#1a1a1a",
            "& fieldset": { borderColor: "#444" },
            "&:hover fieldset": { borderColor: "#777" },
            "&.Mui-focused fieldset": { borderColor: "#90caf9" },
          },
        }}
      />
      <FormControl sx={{ minWidth: 180 }}>
        <InputLabel
          sx={{ color: "#aaa", "&.Mui-focused": { color: "#90caf9" } }}
        >
          Sort by
        </InputLabel>
        <Select
          value={sortBy}
          label='Sort by'
          onChange={(event) => {
            void setSortBy(event.target.value);
          }}
          sx={{
            color: "#fff",
            backgroundColor: "#1a1a1a",

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#444",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#777",
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#90caf9",
            },

            "& .MuiSvgIcon-root": {
              color: "#aaa",
            },
          }}
          MenuProps={{
            slotProps: {
              paper: {
                sx: {
                  backgroundColor: "#1a1a1a",
                  color: "#fff",
                },
              },
            },
          }}
        >
          <MenuItem value='publishOn'>Publish date</MenuItem>
          <MenuItem value='title'>Title</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 160 }}>
        <InputLabel
          sx={{ color: "#aaa", "&.Mui-focused": { color: "#90caf9" } }}
        >
          Order
        </InputLabel>
        <Select
          value={sortOrder}
          label='Order'
          onChange={(event) => {
            void setSortOrder(event.target.value);
          }}
          sx={{
            color: "#fff",
            backgroundColor: "#1a1a1a",

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#444",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#777",
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#90caf9",
            },

            "& .MuiSvgIcon-root": {
              color: "#aaa",
            },
          }}
          MenuProps={{
            slotProps: {
              paper: {
                sx: {
                  backgroundColor: "#1a1a1a",
                  color: "#fff",
                },
              },
            },
          }}
        >
          <MenuItem value='DESC'>Descending</MenuItem>
          <MenuItem value='ASC'>Ascending</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
