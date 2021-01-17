import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

import Search from '../components/Search';
import queryApi from '../helpers/apiUtilities';
import updateLoadingState from '../store/actions/loadingState';
import addJobSearchResults from '../store/actions/jobSearchResults';
import addJobDetails from '../store/actions/jobDetails';
import Loading from '../components/Loading';
import Listings from '../components/Listings';
import Details from '../components/Details';

const JobListings = ({
  isLoading,
  jobSearchResults,
  jobDetails,
  location,
  dispatchUpdateLoadingState,
  dispatchAddJobSearchResults,
  dispatchAddJobDetails,
}) => {
  const searchParams = queryString.parse(location.search);
  const history = useHistory();

  const initiateSearch = query => {
    dispatchUpdateLoadingState(true);

    queryApi.post(0, { 'skill/role': { text: query, experience: 'potential-to-develop' } })
      .then(result => {
        dispatchAddJobSearchResults({ result: result.results, total: result.total });
        if (searchParams.query !== query) history.push(`/jobs?query=${query}&jobId=${searchParams.jobId}`);
        dispatchUpdateLoadingState(false);
      });
  };

  const getJobDetails = jobId => {
    dispatchUpdateLoadingState(true);

    queryApi.get(`https://torre.co/api/opportunities/${jobId}`)
      .then(result => {
        dispatchAddJobDetails(result);
        history.push(`/jobs?query=${searchParams.query}&jobId=${jobId}`);
        dispatchUpdateLoadingState(false);
      });
  };

  useEffect(() => {
    if (searchParams.query !== undefined) {
      initiateSearch(searchParams.query);
    }

    if (searchParams.jobId !== undefined) {
      getJobDetails(searchParams.jobId);
    }
  }, []);

  return (
    <>
      {isLoading ? <Loading /> : ''}

      <Search initiateSearch={initiateSearch} defaultValue={searchParams.query ? searchParams.query : ''} total={jobSearchResults.total} />

      <Listings searchResults={jobSearchResults} searchType="job" getJobDetails={getJobDetails} location={location} />

      <Details details={jobDetails} detailsType="job" />
    </>
  );
};

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  jobSearchResults: state.jobSearchResults,
  jobDetails: state.jobDetails,
});

const mapDispatchToProps = dispatch => ({
  dispatchUpdateLoadingState: value => dispatch(updateLoadingState(value)),
  dispatchAddJobSearchResults: value => dispatch(addJobSearchResults(value)),
  dispatchAddJobDetails: value => dispatch(addJobDetails(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobListings);
