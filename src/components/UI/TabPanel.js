const TabPanel = (props) =>  {
  const { children, value, index, ...other } = props;

  return (
    <div
      id={`simple-tabpanel-${index}`}
      {...other}
      style={{ display: value === index? 'block': 'none', width: '100%'}}
    >
      {children}
    </div>
  );
}

export default TabPanel;