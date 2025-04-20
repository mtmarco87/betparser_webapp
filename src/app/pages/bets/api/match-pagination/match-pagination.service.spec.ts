import { TestBed, inject, fakeAsync, tick } from "@angular/core/testing";
import { MatchPaginationService } from "./match-pagination.service";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { of } from "rxjs";

describe("Service: Pagination", () => {
  let mockAngularFireDatabase: any;
  let mockAngularFireAuth: any;

  beforeEach(() => {
    // Mock AngularFireDatabase
    mockAngularFireDatabase = {
      list: jasmine.createSpy("list").and.returnValue({
        snapshotChanges: jasmine
          .createSpy("snapshotChanges")
          .and.returnValue(of([])), // Mock snapshotChanges
      }),
    };

    // Mock AngularFireAuth
    mockAngularFireAuth = {
      authState: of(null), // Mock the authState observable
      auth: {
        signInAnonymously: jasmine
          .createSpy("signInAnonymously")
          .and.returnValue(
            Promise.resolve({ user: { uid: "mock-uid" } }) // Mocked resolved value
          ),
      },
    };

    TestBed.configureTestingModule({
      providers: [
        MatchPaginationService,
        { provide: AngularFireDatabase, useValue: mockAngularFireDatabase },
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
      ],
    });
  });

  it("should be created", inject(
    [MatchPaginationService],
    (service: MatchPaginationService) => {
      expect(service).toBeTruthy();
    }
  ));

  it("should initialize all data", fakeAsync(
    inject([MatchPaginationService], (service: MatchPaginationService) => {
      // Wait for the asynchronous ensureAuthenticated method to resolve
      tick();

      // Verify that the list method was called with the correct path
      expect(mockAngularFireDatabase.list).toHaveBeenCalledWith("/parsed_bets");

      // Verify that snapshotChanges was called
      expect(mockAngularFireDatabase.list().snapshotChanges).toHaveBeenCalled();
    })
  ));
});
