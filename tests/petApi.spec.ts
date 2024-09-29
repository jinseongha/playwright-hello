import { expect, test } from '@playwright/test';
import { config } from "./testConfig";
import {
  FindPetsByStatusRequest,
  FindPetsByStatusStatusEnum,
  GetPetByIdRequest,
  PetApi,
  ResponseError
} from "../api-client";

test('find pet by id', async () => {
  const petApi = new PetApi(config);
  const req: GetPetByIdRequest = {
    petId: 1
  }

  const result = await petApi.getPetById(req);

  expect(result.id).toBe(1);
  expect(result.name).toBe('Dogs');
  expect(result.photoUrls).toEqual(["ut do adipisicing"]);
  expect(result.status).toBe('pending');
});

test('find pet by negative id - not found', async () => {
  const petApi = new PetApi(config);
  const req: GetPetByIdRequest = {
    petId: -1
  }

  try {
    await petApi.getPetById(req);
  } catch (err) {
    expect(err).toBeInstanceOf(ResponseError);
    // @ts-ignore
    expect(err.response.status).toBe(404);
  }
});

test('find pet by status (available)', async () => {
  const petApi = new PetApi(config);
  const req: FindPetsByStatusRequest = {
    status: FindPetsByStatusStatusEnum.Available
  }

  const result = await petApi.findPetsByStatus(req);

  result.forEach(pet => {
    expect(pet.status).toBe('available');
  });
});

test('find pet by status (pending)', async () => {
  const petApi = new PetApi(config);
  const req: FindPetsByStatusRequest = {
    status: FindPetsByStatusStatusEnum.Pending
  }

  const result = await petApi.findPetsByStatus(req);

  result.forEach(pet => {
    expect(pet.status).toBe('pending');
  });
});

test('find pet by status (sold)', async () => {
  const petApi = new PetApi(config);
  const req: FindPetsByStatusRequest = {
    status: FindPetsByStatusStatusEnum.Sold
  }

  const result = await petApi.findPetsByStatus(req);

  result.forEach(pet => {
    expect(pet.status).toBe('sold');
  });
});
