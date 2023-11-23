import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  form: {
    gap: 20,
    padding: 30,
    width: "100%",
  },
  label: {
    color: "$textDark0",
  },
  teste: {
    color: "$textDark500",
  },
  withoutLoginText: {
    width: "100%",
    textAlign: "center",
  },
  radioGroup: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 5,
  },
});

const sxs = {
  formLabel: {
    color: "$primary400",
    fontWeight: "bold",
  },
};

export { styles, sxs };
