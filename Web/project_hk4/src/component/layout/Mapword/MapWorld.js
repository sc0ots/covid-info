import React, { useEffect, useMemo } from 'react';
import { sortBy } from 'lodash';
import CountrySelector from './components/CountrySelector';
import { getCountries, getReportByCountry } from './components/apis';
import Summary from './components/Summary';
import Highlight from './components/Highlight';
import { Container, Typography } from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/vi';
import NotFoundPage from "../../main/NotFoundPage";


moment.locale('en');

const MapWord = () => {
  const [countries, setCountries] = React.useState([]);
  const [selectedCountryId, setSelectedCountryId] = React.useState('');
  const [report, setReport] = React.useState([]);

  useEffect(() => {
    getCountries().then((res) => {
      const { data } = res;
      const countries = sortBy(data, 'Country');
      setCountries(countries);
      setSelectedCountryId('vn');
    });
  }, []);

  const handleOnChange = React.useCallback((e) => {
    setSelectedCountryId(e.target.value);
  }, []);

  useEffect(() => {
    if (selectedCountryId) {
      const selectedCountry = countries.find(
        (country) => country.ISO2 === selectedCountryId.toUpperCase()
      );
      getReportByCountry(selectedCountry.Slug).then((res) => {
        console.log('getReportByCountry', { res });
        // remove last item = current date
        res.data.pop();
        setReport(res.data);
      });
    }
  }, [selectedCountryId, countries]);

  const summary = useMemo(() => {
    if (report && report.length) {
      const latestData = report[report.length - 1];
      return [
        {
          title: 'INFECTED',
          count: latestData.Confirmed,
          type: 'confirmed',
        },
        // {
        //   title: 'Khỏi',
        //   count: latestData.Recovered,
        //   type: 'recovered',
        // },
        {
          title: 'DECEASED',
          count: latestData.Deaths,
          type: 'death',
        },
      ];
    }
    return [];
  }, [report]);
  const isLogged = JSON.parse(localStorage.getItem("user"))
  let isShow;
  if (isLogged.role == "admin") {
    isShow = true;
  } else {
    isShow = false
  }

  if (isShow) {
      return (<NotFoundPage />)
  }else{
    return (
      <div>
        <Typography variant='h4' component='h4'>
          DATA VIRUS CORONA ON THE WORLD
        </Typography>
        <Typography>{moment().format('LLL')}</Typography>
        <CountrySelector
          handleOnChange={handleOnChange}
          countries={countries}
          value={selectedCountryId}
        />
        <Highlight summary={summary} />
        <Summary countryId={selectedCountryId} report={report} />
      </div>
    );
  }
};

export default MapWord;
