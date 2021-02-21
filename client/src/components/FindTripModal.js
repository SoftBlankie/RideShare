import React, { useState } from "react";
import { Modal, Button, Input, AutoComplete } from "antd";
import "./FindTripModal.css";

const FindTripModal = ({
  loading,
  visible,
  updateLocation,
  setFindTrip,
  autocompleteService,
}) => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);

  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);

  const autoComplete = (val, ind) => {
    if (!val) {
      console.log("no val");
      ind == 0 ? setPickupSuggestions([]) : setDropoffSuggestions([]);
    } else {
      // autocomplete
      autocompleteService.getPlacePredictions({ input: val }, (res) => {
        let newSuggestions = [];
        res.map((addr) => {
          newSuggestions.push({ value: addr.description });
        });
        console.log(newSuggestions);
        ind == 0
          ? setPickupSuggestions(newSuggestions)
          : setDropoffSuggestions(newSuggestions);
      });
    }
  };

  return (
    <Modal
      visible={visible}
      title="Find Trip"
      onOk={() => setFindTrip(false)}
      onCancel={() => setFindTrip(false)}
      footer={[
        <Button key="back" onClick={() => setFindTrip(false)}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => updateLocation(pickup, dropoff)}
        >
          Find
        </Button>,
      ]}
    >
      <div className="form-input">
        <AutoComplete
          options={pickupSuggestions}
          onSearch={(e) => autoComplete(e, 0)}
          onChange={(e) => setPickup(e)}
          style={{ width: "100%" }}
        >
          <Input placeholder="Pickup" />
        </AutoComplete>
      </div>
      <div className="form-input">
        <AutoComplete
          options={dropoffSuggestions}
          onSearch={(e) => autoComplete(e, 1)}
          onChange={(e) => setDropoff(e)}
          style={{ width: "100%" }}
        >
          <Input placeholder="Dropoff" />
        </AutoComplete>
      </div>
    </Modal>
  );
};

export default FindTripModal;
