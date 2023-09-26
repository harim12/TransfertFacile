package com.RimHASSANI.demo.springsecurityjwt.controller;

import com.RimHASSANI.demo.springsecurityjwt.model.*;
import com.RimHASSANI.demo.springsecurityjwt.service.DemandeService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Base64;
import java.util.List;
import com.fasterxml.jackson.databind.ObjectMapper;


@RestController
@RequestMapping("/demande")
@CrossOrigin(origins = "http://localhost:4200")
@Slf4j
public class DemandeController {
    @Autowired
    private DemandeService demandeService;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping("/")
    public String getHell(){
        return "hello";
    }

    /*@PostMapping("/add")
    public DemandeEntity addDemande(@RequestBody DemandeEntity demandeEntity){
        return demandeService.addDemande(demandeEntity);
    }*/

    /*@PostMapping("/add")
    public DemandeEntity addDemande(@RequestBody DemandeEntity demandeEntity) {
        DemandeSpecific specificDemande = demandeEntity.getSpecificDemande();
        if (specificDemande != null) {
            if (specificDemande instanceof MeubleDemande) {
                MeubleDemande meubleDemande = (MeubleDemande) specificDemande;
                meubleDemande.setDemandeEntity(demandeEntity);
            } else if (specificDemande instanceof VoitureDemande) {
                VoitureDemande voitureDemande = (VoitureDemande) specificDemande;
                voitureDemande.setDemandeEntity(demandeEntity);
            } else if(specificDemande instanceof MotoDemande){
                MotoDemande motoDemande = (MotoDemande) specificDemande;
                motoDemande.setDemandeEntity(demandeEntity);
            }
            else if(specificDemande instanceof ColisList){
                ColisList colisList = (ColisList) specificDemande;
                colisList.setDemandeEntity(demandeEntity);

            }
        }
        return demandeService.addDemande(demandeEntity);
    }*/

    @PostMapping("/add")
    public DemandeEntity addDemande(@ModelAttribute String testDataJson, @RequestParam("image") MultipartFile imageFile) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            DemandeEntity demenagementEntity = objectMapper.readValue(testDataJson, DemandeEntity.class);


            // Save the main image to the file system
            String mainImagePath = "C:/Users/hassa/OneDrive/Documents/GitHub/TransfertFacile/front/src/assets/assetsBack" + imageFile.getOriginalFilename();
            Files.copy(imageFile.getInputStream(), Paths.get(mainImagePath), StandardCopyOption.REPLACE_EXISTING);

            // Set the image path in the entity
            demenagementEntity.setFirstImageUrl(mainImagePath);
            DemandeSpecific specificDemande = demenagementEntity.getSpecificDemande();
            System.out.println("this is the demande============>"+demenagementEntity);
            if (specificDemande != null) {
                if (specificDemande instanceof MeubleDemande) {
                    MeubleDemande meubleDemande = (MeubleDemande) specificDemande;
                    meubleDemande.setDemandeEntity(demenagementEntity);
                } else if (specificDemande instanceof VoitureDemande) {
                    VoitureDemande voitureDemande = (VoitureDemande) specificDemande;
                    voitureDemande.setDemandeEntity(demenagementEntity);
                } else if(specificDemande instanceof MotoDemande){
                    MotoDemande motoDemande = (MotoDemande) specificDemande;
                    motoDemande.setDemandeEntity(demenagementEntity);
                }
                else if(specificDemande instanceof ColisList){
                    ColisList colisList = (ColisList) specificDemande;
                    colisList.setDemandeEntity(demenagementEntity);

                }
            }

            return demandeService.addDemande(demenagementEntity);
        }

        catch (IOException e) {
            // Handle the exception, e.g., log it or return an error response
            e.printStackTrace();
            // Return an appropriate response indicating failure
            // For example: return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Image upload failed");
        }


      return null;
    }

    @PostMapping("/addTeste")
    public DemandeEntity addTeste(@RequestParam("testeEntity") String testDataJson,
                                  @RequestParam(value = "image1", required = false) MultipartFile imageFile1,
                                  @RequestParam(value = "image2", required = false) MultipartFile imageFile2,
                                  @RequestParam(value = "image3", required = false) MultipartFile imageFile3) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            DemandeEntity testeEntity = objectMapper.readValue(testDataJson, DemandeEntity.class);



            if (imageFile1 != null) {
                String image1Path = "C:\\Users\\hassa\\OneDrive\\Documents\\GitHub\\TransfertFacile\\front\\src\\assets\\assetsBack" + imageFile1.getOriginalFilename();
                Files.copy(imageFile1.getInputStream(), Paths.get(image1Path), StandardCopyOption.REPLACE_EXISTING);
                testeEntity.setFirstImageUrl(image1Path);
                testeEntity.setFirstImageUrl(image1Path);

            }

            if (imageFile2 != null) {
                String image2Path = "C:\\Users\\hassa\\OneDrive\\Documents\\GitHub\\TransfertFacile\\front\\src\\assets\\assetsBack" + imageFile2.getOriginalFilename();
                Files.copy(imageFile2.getInputStream(), Paths.get(image2Path), StandardCopyOption.REPLACE_EXISTING);
                testeEntity.setSecondImageUrl(image2Path);
                testeEntity.setSecondImageUrl(image2Path);

            }

            if (imageFile3 != null) {
                String image3Path = "C:\\Users\\hassa\\OneDrive\\Documents\\GitHub\\TransfertFacile\\front\\src\\assets\\assetsBack" + imageFile3.getOriginalFilename();
                Files.copy(imageFile3.getInputStream(), Paths.get(image3Path), StandardCopyOption.REPLACE_EXISTING);
                testeEntity.setThirdImageUrl(image3Path);

            }


            // Set the image path in the entity
            System.out.println("this is the demande============>" + testeEntity);


            DemandeSpecific specificDemande = testeEntity.getSpecificDemande();
            System.out.println("this is the demande============>"+testeEntity);
            if (specificDemande != null) {
                if (specificDemande instanceof MeubleDemande) {
                    MeubleDemande meubleDemande = (MeubleDemande) specificDemande;
                    meubleDemande.setDemandeEntity(testeEntity);
                } else if (specificDemande instanceof VoitureDemande) {
                    VoitureDemande voitureDemande = (VoitureDemande) specificDemande;
                    voitureDemande.setDemandeEntity(testeEntity);
                } else if(specificDemande instanceof MotoDemande){
                    MotoDemande motoDemande = (MotoDemande) specificDemande;
                    motoDemande.setDemandeEntity(testeEntity);
                }
                else if(specificDemande instanceof ColisList){
                    ColisList colisList = (ColisList) specificDemande;
                    colisList.setDemandeEntity(testeEntity);

                }
            }

            return demandeService.addDemande(testeEntity);
        } catch (IOException e) {
            // Handle the exception
            e.printStackTrace();
            // Return an appropriate response indicating failure
            // For example: return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Image upload failed");
        }
        return null;
    }



    @GetMapping("/get")
    public List<DemandeEntity> getDemandes(){
        //I need to get demandes only in the same city
        return demandeService.getDemandes();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<DemandeEntity> getDemandeById(@PathVariable Integer id) {
        DemandeEntity demande = demandeService.getDemandeById(id);

        if (demande != null) {
            return ResponseEntity.ok(demande);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



}
