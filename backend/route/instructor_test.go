package route

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"

	"github.com/ucsdscheduleplanner/UCSD-Schedule-Planner/backend/environ"
	"github.com/ucsdscheduleplanner/UCSD-Schedule-Planner/backend/store"
)

func TestGetInstructors(t *testing.T) {
	req, err := http.NewRequest("GET", "/api_instructors?department=CSE&courseNum=11&quarter=SP19", nil)

	if err != nil {
		t.Fatal("Could not create the request.")
	}

	d, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("an error '%s' was not expected when opening a stub database connection", err)
	}
	defer d.Close()

	mock.ExpectQuery(`^SELECT DISTINCT INSTRUCTOR FROM (.+)`).
		WithArgs("CSE", "11").
		WillReturnRows(sqlmock.NewRows([]string{"INSTRUCTOR"}).
			AddRow("Professor"))

	db := store.NewDB(d, map[string]bool{"SP19": true})

	response := mockGetInstructors(req, db)
	checkResponseCode(t, http.StatusOK, response.Code)

	body, err := ioutil.ReadAll(response.Body)

	var instructors []string
	err = json.Unmarshal(body, &instructors)

	if len(instructors) == 0 {
		t.Fatal("Instructors cannot be empty")
	}

	for _, el := range instructors {
		if len(el) == 0 {
			t.Fatal("Invalid instructor")
		}
	}
}

func mockGetInstructors(request *http.Request, db *store.DB) *httptest.ResponseRecorder {
	recorder := httptest.NewRecorder()
	createHandler(GetInstructors, &environ.Env{}, db, LogPrefixInstructors)(recorder, request)
	return recorder
}
