package com.RimHASSANI.demo.springsecurityjwt.service;

import com.RimHASSANI.demo.springsecurityjwt.model.*;
import com.RimHASSANI.demo.springsecurityjwt.repository.TransporteurRepository;
import com.RimHASSANI.demo.springsecurityjwt.repository.UserRepository;
import jakarta.persistence.Tuple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class TransporteurService  implements UserDetailsService {
    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransporteurRepository transporteurRepository;

    @Autowired
    WebSocketService webSocketService;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {


        return transporteurRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("transporteur is not valid"));
    }

    public TransporteurInfo getTransporteurInfoByEmail(String email) {
        Tuple tuple = transporteurRepository.getTransporteurInfoByEmail(email);

        if (tuple != null) {
            String firstName = tuple.get("first_name", String.class);
            String lastName = tuple.get("last_name", String.class);
            String vehiculeImageUrl = tuple.get("image_vehicule_url", String.class);

            return new TransporteurInfo(firstName, lastName, vehiculeImageUrl);
        }

        return null;
    }

    public TransporteurPersonalInfo getTransporteurPersonalInfoByEmail(String email) {
        Tuple tuple = transporteurRepository.getTransporteurPersonalInfoByEmail(email);

        if (tuple != null) {
            String firstName = tuple.get("first_name", String.class);
            String lastName = tuple.get("last_name", String.class);
            String  imageUrl  = tuple.get("image_url",String.class);
            String city = tuple.get("city",String.class);
            Integer phoneNumber = tuple.get("phone_number",Integer.class);

            return new TransporteurPersonalInfo(firstName, lastName,imageUrl,phoneNumber,city,email);
        }

        return null;
    }

    public TransporteurPersonalInfo updateTransporteurInfo(TransporteurPersonalInfo transporteurPersonalInfo,String imagePath) {
        Transporteur existingTransporteur = transporteurRepository.findByEmail(transporteurPersonalInfo.getEmail()).get();
        if (existingTransporteur != null) {
            // Update the fields that you want to allow changing
            existingTransporteur.setFirstName(transporteurPersonalInfo.getFirstName());
            existingTransporteur.setLastName(transporteurPersonalInfo.getLastName());
            existingTransporteur.setCity(transporteurPersonalInfo.getCity());
            existingTransporteur.setImageUrl(imagePath);
            // You can similarly update other fields as needed

            // Save the updated transporteur information back to the database
            transporteurRepository.save(existingTransporteur);

            TransporteurPersonalInfo updatedPersonalInfo = new TransporteurPersonalInfo();
            updatedPersonalInfo.setFirstName(existingTransporteur.getFirstName());
            updatedPersonalInfo.setLastName(existingTransporteur.getLastName());
            updatedPersonalInfo.setCity(existingTransporteur.getCity());
            updatedPersonalInfo.setEmail(existingTransporteur.getEmail());
            updatedPersonalInfo.setImageUrl(existingTransporteur.getImageUrl());
            notifyFrontend();

            return updatedPersonalInfo;
        } else {
            // Handle the case where the transporteur with the provided email does not exist
            return null;
        }

    }

    protected String getEntityTopic(){
        return "change";
    }
    public void notifyFrontend(){
        final String entityTopic = getEntityTopic();
        if(entityTopic==null){

            return;
        }
        System.out.println("sending message to front"+entityTopic);
        webSocketService.sendMessage(entityTopic,"transporteur");

    }

    public TransporteurPaimentInfo getTransporteurPaimentInfo(String email) {
        Tuple tuple = transporteurRepository.getTransporteurPaimentInfoByEmail(email);

        if (tuple != null) {
            String card_expiry = tuple.get("card_expiry", String.class);
            String ccv_card = tuple.get("ccv_card", String.class);
            String  payment_card_num  = tuple.get("payment_card_num",String.class);
            String name_on_card = tuple.get("name_on_card",String.class);
            String  street_address  = tuple.get("street_address",String.class);
            String city = tuple.get("city",String.class);

            return new TransporteurPaimentInfo(card_expiry, ccv_card,payment_card_num,name_on_card,street_address,city,email);
        }

        return null;
    }

    public ResponseEntity<TransporteurPaimentInfo> updateTransporteurPaimentInfo(TransporteurPaimentInfo transporteurPaimentInfo) {

        Transporteur existingTransporteur = transporteurRepository.findByEmail(transporteurPaimentInfo.getEmail()).orElse(null);

        if (existingTransporteur != null) {
            // Update the payment information
            existingTransporteur.setCardExpiry(transporteurPaimentInfo.getCardExpiry());
            existingTransporteur.setCcvCard(transporteurPaimentInfo.getCcvCard());
            existingTransporteur.setPaymentCardNum(transporteurPaimentInfo.getPaymentCardNum());
            existingTransporteur.setNameOnCard(transporteurPaimentInfo.getNameOnCard());
            existingTransporteur.setStreetAddress(transporteurPaimentInfo.getStreetAddress());
            existingTransporteur.setCity(transporteurPaimentInfo.getCity());

            // Save the updated transporteur with payment info to the database
            transporteurRepository.save(existingTransporteur);
            TransporteurPaimentInfo updatedPersonalInfo = new TransporteurPaimentInfo();
            updatedPersonalInfo.setCardExpiry(existingTransporteur.getCardExpiry());
            updatedPersonalInfo.setCcvCard(existingTransporteur.getCcvCard());
            updatedPersonalInfo.setPaymentCardNum(existingTransporteur.getPaymentCardNum());
            updatedPersonalInfo.setNameOnCard(existingTransporteur.getNameOnCard());
            updatedPersonalInfo.setStreetAddress(existingTransporteur.getStreetAddress());
            updatedPersonalInfo.setCity(existingTransporteur.getCity());
            notifyFrontend();

            return ResponseEntity.ok(updatedPersonalInfo);
        } else {
            // Handle the case where the transporteur with the provided email does not exist
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<String> changePassword(PasswordEntity passwordEntity) {
        Transporteur transporteur = transporteurRepository.findByEmail(passwordEntity.getEmail()).orElse(null);
        if (transporteur != null) {
            // Check if the old password matches the current password
            if (passwordEncoder.matches(passwordEntity.getOldPassword(), transporteur.getPassword())) {
                // Encode and set the new password
                String newPasswordEncoded = passwordEncoder.encode(passwordEntity.getNewPassword());
                transporteur.setPassword(newPasswordEncoded);

                transporteurRepository.save(transporteur);
                System.out.println(transporteurRepository.save(transporteur));
                return ResponseEntity.ok("Password changed successfully.");
            } else {
                return ResponseEntity.badRequest().body("Old password is incorrect.");
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public TransporteurVehiculeInfo getTransporteurVehiculeInfo(String email) {
        Tuple tuple = transporteurRepository.getTransporteurVehiculeInfoByEmail(email);

        if (tuple != null) {
            String imageVehiculeUrl = tuple.get("image_vehicule_url", String.class);
            String driverLiscence = tuple.get("driver_liscence", String.class);
            String  nationalIdentity  = tuple.get("national_identity",String.class);
            String vehiculeRegistrationNumber = tuple.get("vehicule_registration_number",String.class);

            return new TransporteurVehiculeInfo(imageVehiculeUrl, driverLiscence,nationalIdentity,vehiculeRegistrationNumber,email);
        }

        return null;
    }

    public ResponseEntity<TransporteurVehiculeInfo> updateTransporteurVehiculeInfo(TransporteurVehiculeInfo transporteurVehiculeInfo,String imageVehiculeUrl) {
        Transporteur existingTransporteur = transporteurRepository.findByEmail(transporteurVehiculeInfo.getEmail()).orElse(null);

        if (existingTransporteur != null) {
            // Update the payment information
            existingTransporteur.setVehiculeRegistrationNumber(transporteurVehiculeInfo.getVehiculeRegistrationNumber());
            existingTransporteur.setNationalIdentity(transporteurVehiculeInfo.getNationalIdentity());
            existingTransporteur.setDriverLiscence(transporteurVehiculeInfo.getDriverLiscence());
            existingTransporteur.setImageVehiculeUrl(imageVehiculeUrl);


            // Save the updated transporteur with payment info to the database
            transporteurRepository.save(existingTransporteur);

            TransporteurVehiculeInfo updatedPersonalInfo = new TransporteurVehiculeInfo();
            updatedPersonalInfo.setVehiculeRegistrationNumber(existingTransporteur.getVehiculeRegistrationNumber());
            updatedPersonalInfo.setNationalIdentity(existingTransporteur.getNationalIdentity());
            updatedPersonalInfo.setDriverLiscence(existingTransporteur.getDriverLiscence());
            updatedPersonalInfo.setImageVehiculeUrl(imageVehiculeUrl);

            notifyFrontend();

            return ResponseEntity.ok(updatedPersonalInfo);
        } else {
            // Handle the case where the transporteur with the provided email does not exist
            return ResponseEntity.notFound().build();
        }
    }
}

