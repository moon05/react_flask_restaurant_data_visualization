import time
from flask import Flask
import os
import sys
import glob
import pandas as pd

app = Flask(__name__)

@app.route('/time')
def get_current_time():
	return {'time': time.time()}

@app.route('/customerCountByHour')
def get_customer_count_by_hour(df):
	del df['day_part']
	del df['model_id']
	del df["tts"]
	df.set_index('date', inplace=True)
	startTime = "2020-08-03" + " 00:00:00"
	endTime = "2020-08-03" + " 23:59:59"
	tmp = df.loc[startTime:endTime]
	tmp.rename(columns={"index":"date"}, inplace=True)
	
	# df.set_index('date', inplace=True)
	tmp = tmp.groupby(tmp.index.map(lambda t: t.hour)).count()
	tmp.reset_index(inplace=True)
	print (tmp)
	return tmp

