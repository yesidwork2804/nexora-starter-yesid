'use strict';

module.exports = (req, res) => {
  const REPORT_SECRET = process.env.REPORT_SECRET;

  if (req.method !== 'GET') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    level: 'INFO',
    event: 'stock_report_generation_started',
    reportSecretPresent: Boolean(REPORT_SECRET),
  }));

  res.status(200).json({
    status: 'success',
    message: 'Report generation started',
    timestamp: new Date().toISOString()
  });
};
