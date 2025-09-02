import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);
