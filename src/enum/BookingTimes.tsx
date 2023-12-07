export enum BookingTypes {
  StartTime = "START_TIME",
  EndTime = "END_TIME",
  NewStartOldEnd = "NS_OE",
  OldStartNewEnd = "OS_NE",
  SameEndNewStart = "SE_ST",
  KeepEndRemoveStart = "KE_RS",
  KeepStartRemoveEnd = "KS_RE",
  StartLowerEnd = "SLE",
  StartHigherEnd = "SHE",
  Clear = "CLEAR",
}
